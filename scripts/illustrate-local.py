"""Local picture generation for scripts/illustrate.ts --engine local (decided 5 November 2026).

Loads Z-Image Turbo (4-bit, through mflux) once and renders every job of a JSONL queue into
<outdir>/<id>.png. Each job is {"id", "prompt", "seed", "width", "height"}; an existing PNG is skipped,
so a run can be resumed. illustrate.ts starts this with:

    uv run --no-project --with mflux python scripts/illustrate-local.py <queue.jsonl> <outdir> <model> <steps>

Nothing here talks to a network service apart from the first model download into the Hugging Face cache.
"""
import json
import os
import sys
import time

from mflux.models.z_image.cli.z_image_turbo_generate import ZImageTurboCommand, build_parser

queue_path, outdir, model_name, steps = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
jobs = [json.loads(line) for line in open(queue_path, encoding="utf-8") if line.strip()]
todo = [job for job in jobs if not os.path.exists(os.path.join(outdir, job["id"] + ".png"))]
if not todo:
    print("local images: nothing to draw", flush=True)
    sys.exit(0)

first = todo[0]
sys.argv = [sys.argv[0], "--model", model_name, "--base-model", "z-image-turbo", "--prompt", "x",
            "--steps", str(steps), "--width", str(first["width"]), "--height", str(first["height"])]
args = build_parser().parse_args()
model = ZImageTurboCommand.load(args)
failed = 0
for index, job in enumerate(todo, 1):
    started = time.time()
    args.width, args.height = int(job["width"]), int(job["height"])
    try:
        image = ZImageTurboCommand.generate(model, args, int(job["seed"]), job["prompt"])
        image.save(path=os.path.join(outdir, job["id"] + ".png"), export_json_metadata=False)
        print(f"local images: {index}/{len(todo)} {job['id']} {time.time() - started:.0f}s", flush=True)
    except Exception as error:  # keep going; illustrate.ts reports the missing file
        failed += 1
        print(f"local images: {index}/{len(todo)} {job['id']} FAILED {error}", flush=True)
sys.exit(1 if failed else 0)
