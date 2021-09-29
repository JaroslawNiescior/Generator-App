import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/webpack-resolver";

export const CustomEditor: React.FC<{
  code: string;
  setCode: (value: React.SetStateAction<string>) => void;
}> = ({ code, setCode }) => {
  return (

      <AceEditor
        mode='html'
        theme="monokai"
        onChange={(code) => setCode(code)}
        width={'100%'}
        height={'40vh'}
        fontSize={15}
        showPrintMargin={true}
        highlightActiveLine={false}
        value={code}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
          cursorStyle: "slim",
          fontFamily: 'monospace'
        }}
      />
  );
};
