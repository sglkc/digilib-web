import { useRef, useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import Button from '@/components/Button';
import Input from '@/components/Input';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function AdminEditorView() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const link = useRef(null);

  editorState.getCurrentInlineStyle

  function getHtml() {
    const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body style="font-family: Arial, sans-serif">
${draftToHtml(convertToRaw(editorState.getCurrentContent()))}
  </body>
</html>`;

    return html;
  }

  function download(e) {
    e.preventDefault();

    const html = getHtml();
    const filename = e.target.elements.filename.value.replace(/ /g, '-');
    const file = new Blob([html], { type: 'text/html' });
    const url = window.URL.createObjectURL(file);

    link.current.download = filename + '.html';
    link.current.href = url;
    link.current.click();
  }

  function preview() {
    const html = getHtml();
    const file = new Blob([html], { type: 'text/html' });
    const url = window.URL.createObjectURL(file);

    window.open(url, '_blank');

    return console.log(html);
  }

  return (
    <>
      <a ref={link} style={{ display: 'none' }}/>
      <form
        style={{ marginBottom: '1rem', display: 'flex', gap: '0.25rem' }}
        onSubmit={download}
      >
        <Input
          style={{
            backgroundColor: '#fdfdfd',
            flexGrow: 1,
            width: 'auto',
            border: '1px solid #ddd'
          }}
          name="filename"
          pattern="[a-zA-Z- ]+"
          placeholder="Masukkan nama file artikel (a-z)"
          required
        />
        <Button
          type="button"
          style={{ backgroundColor: 'slategray' }}
          onClick={preview}
        >
          Pratinjau
        </Button>
        <Button type="submit">Unduh</Button>
      </form>
      <Editor
        placeholder="Ketik isi artikel..."
        toolbarStyle={{
          backgroundColor: '#fdfdfd',
          borderColor: '#ddd',
          position: 'sticky',
          top: '4rem',
          zIndex: '400',
        }}
        editorStyle={{
          backgroundColor: '#fdfdfd',
          padding: '0 1rem',
          border: '1px solid #ddd',
          borderRadius: '0.25rem',
          fontFamily: 'Arial, sans-serif',
          fontSize: 'initial',
          fontWeight: 'initial',
          lineHeight: 'initial'
        }}
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          options: [
            'inline', 'blockType', 'fontSize', 'list', 'textAlign',
            'colorPicker', 'link', 'image', 'remove', 'history'
          ]
        }}
      />
    </>
  );
}
