import { ScenesComposer } from 'grammy-scenes'
import { HodimScene } from './hodim.scene'
import { Adminscene } from './admin.scene'
import { Ishscene } from './ish.scene'
import { Ustozscene } from './ustoz.scene'
import { Sherikscene } from './sherik.scene'
import { BotContext } from '../utils'



export const scenes=new ScenesComposer<BotContext>(
    HodimScene,
    Adminscene,
    Ishscene,
    Ustozscene,
    Sherikscene
)