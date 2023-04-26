import { BlockNoteEditor } from '@blocknote/core'
import type { BlockNoteEditorOptions } from '@blocknote/core'
import './index.css'
import { blockSideMenuFactory } from './ui/blockSideMenuFactory'
import { formattingToolbarFactory } from './ui/formattingToolbarFactory'
import { hyperlinkToolbarFactory } from './ui/hyperlinkToolbarFactory'
import { slashMenuFactory } from './ui/slashMenuFactory'

// const editor = new BlockNoteEditor({
//   parentElement: document.getElementById('block-note')!,
//   uiFactories: {
//     // Create an example formatting toolbar which just consists of a bold toggle
//     formattingToolbarFactory,
//     // Create an example menu for hyperlinks
//     hyperlinkToolbarFactory,
//     // Create an example menu for the /-menu
//     slashMenuFactory,
//     // Create an example menu for when a block is hovered
//     blockSideMenuFactory,
//   },
//   onEditorContentChange: () => {
//     console.log(editor.topLevelBlocks)
//   },
//   editorDOMAttributes: {
//     class: 'editor',
//   },
// })

const createEditor = (option?: Partial<BlockNoteEditorOptions> | undefined) =>
  new BlockNoteEditor({
    uiFactories: {
      // Create an example formatting toolbar which just consists of a bold toggle
      formattingToolbarFactory,
      // Create an example menu for hyperlinks
      hyperlinkToolbarFactory,
      // Create an example menu for the /-menu
      slashMenuFactory,
      // Create an example menu for when a block is hovered
      blockSideMenuFactory,
      ...option?.uiFactories,
    },
  })

export { createEditor }
