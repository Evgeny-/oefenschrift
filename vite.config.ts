import {defineConfig} from 'vite';
import {reactRouter} from '@react-router/dev/vite';
import {resolve} from 'node:path';
// ECharts is loaded on demand by the operator pages; pre-bundling it keeps Vite from re-optimising mid-session.
export default defineConfig({plugins:[reactRouter()],optimizeDeps:{include:['echarts/core','echarts/charts','echarts/components','echarts/renderers']},server:{fs:{deny:['**/.env*',...['config','server','var','reference-private','tmp','research','scripts','tests'].map(path=>resolve(path)+'/**')]},watch:{ignored:['**/tmp/**','**/var/**','**/build/**','**/.git/**']}}});
