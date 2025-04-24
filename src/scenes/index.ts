import { ScenesComposer } from 'grammy-scenes'
import { HodimScene } from './hodim.scene'
import { Adminscene } from './admin.scene'
import { Ishscene } from './ish.scene'
import { Ustozscene } from './ustoz.scene'
import { Shogirdscene } from './shogird.scene'
import { Sherikscene } from './sherik.scene'



export const scenes=new ScenesComposer(
    HodimScene,
    Adminscene,
    Ishscene,
    Ustozscene,
    Shogirdscene,
    Sherikscene
)