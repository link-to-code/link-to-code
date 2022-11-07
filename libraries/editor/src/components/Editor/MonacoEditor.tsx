import React from "react";
import Editor from "@monaco-editor/react";
import { useActiveCode, SandpackStack, FileTabs, useSandpack } from "@codesandbox/sandpack-react";
import { getLanguageFromFile } from "../../utils/";

function MonacoEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const language = getLanguageFromFile(sandpack.activeFile);
  return (
    <SandpackStack style={{ height: "100vh", margin: 0 }}>
      <FileTabs />
      <Editor
        language={language}
        theme="vs-dark"
        key={sandpack.activeFile}
        defaultValue={code}
        onChange={(value) => updateCode(value || "")}
      />
    </SandpackStack>
  );
}

export default MonacoEditor;
