import {readPreferences} from './domain/render-state';
import {resolveTheme} from './domain/theme';
let preference=readPreferences(document.cookie).theme;
try{const s=JSON.parse(localStorage.getItem('inburgering.study.v2')??localStorage.getItem('samen.study.v1'));if(s?.settings?.theme)preference=s.settings.theme;}catch{}
document.documentElement.dataset.theme=resolveTheme(preference,matchMedia('(prefers-color-scheme: dark)').matches);
