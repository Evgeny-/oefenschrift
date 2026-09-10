import React from 'react';
import { createRoot } from 'react-dom/client';
import { Select } from '@base-ui/react/select';
import { Switch } from '@base-ui/react/switch';

const roots = new Map();
function Choice({label, value, items, onChange}) {
  return <Select.Root value={value} items={items} onValueChange={onChange}>
    <Select.Label className="control-label">{label}</Select.Label>
    <Select.Trigger className="choice-trigger">
      <Select.Value />
      <Select.Icon><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="m3 5 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Positioner className="choice-positioner" sideOffset={5} alignItemWithTrigger={false}>
        <Select.Popup className="choice-popup"><Select.List>
          {items.map(item=><Select.Item className="choice-item" key={item.value} value={item.value} disabled={item.disabled}>
            <Select.ItemText>{item.label}</Select.ItemText>
            <Select.ItemIndicator className="choice-check">✓</Select.ItemIndicator>
          </Select.Item>)}
        </Select.List></Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  </Select.Root>;
}
function Toggle({label, checked, onChange}) {
  return <label className="timer-setting">
    <Switch.Root className="toggle-track" checked={checked} onCheckedChange={onChange}><Switch.Thumb className="toggle-thumb" /></Switch.Root>
    <span>{label}</span>
  </label>;
}
window.SamenControls = {
  mount(element, kind, props) {
    if (!element) return;
    let root=roots.get(element);
    if (!root) { root=createRoot(element); roots.set(element,root); }
    root.render(kind==='toggle'?<Toggle {...props}/>:<Choice {...props}/>);
  },
  releaseWithin(parent) {
    for (const [element,root] of roots) if(parent.contains(element)) {root.unmount();roots.delete(element);}
  }
};
