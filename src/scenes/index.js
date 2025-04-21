import { ScenesComposer } from 'grammy-scenes'
import { HodimScene } from './hodim.scene.js'
import { Adminscene } from './admin.scene.js'
import { Ishscene } from './ish.scene.js'
import { Ustozscene } from './ustoz.scene.js'
import { Shogirdscene } from './shogird.scene.js'
import { Sherikscene } from './sherik.scene.js'






export const scenes=new ScenesComposer(
    HodimScene,
    Adminscene,
    Ishscene,
    Ustozscene,
    Shogirdscene,
    Sherikscene
)