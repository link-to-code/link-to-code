import React from "react";
import MonacoEditor from "./MonacoEditor";
import "./Editor.css";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackTests,
  SandpackThemeProp,
  SandpackFiles,
  SandpackPredefinedTemplate,
} from "@codesandbox/sandpack-react";
import Split from "react-split";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

type EditorProps = {
  files: SandpackFiles;
  theme: SandpackThemeProp;
  template: SandpackPredefinedTemplate;
  showPanelTest: boolean;
  showPanelPreview: boolean;
};

function EditorProvider({
  files,
  theme = "dark",
  template,
  showPanelTest = false,
  showPanelPreview = false,
}: EditorProps) {
  return (
    <SandpackProvider files={files} theme={theme} template={template}>
      <Split
        sizes={[50, 50]}
        minSize={400}
        gutterSize={7}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={10}
        direction="horizontal"
        cursor="col-resize"
        className="flex flex-row"
      >
        <div>
          <MonacoEditor />
        </div>
        {(showPanelTest || showPanelPreview) && (
          <div>
            <Tabs
              className={"tabs"}
              forceRenderTabPanel
              disabledTabClassName="tab"
              selectedTabClassName="tab-active"
            >
              <div className="flex flex-col w-full h-full">
                <div className="item w-full">
                  <TabList>
                    <Tab className={"tab"}>Preview</Tab>
                    <Tab className={"tab"}>Tests</Tab>
                  </TabList>
                </div>
                <div className="item">
                  <TabPanel>
                    <SandpackPreview showOpenInCodeSandbox={false} />
                  </TabPanel>
                  <TabPanel>
                    <SandpackTests watchMode />
                  </TabPanel>
                </div>
              </div>
            </Tabs>
          </div>
        )}
      </Split>
    </SandpackProvider>
  );
}

export default EditorProvider;
