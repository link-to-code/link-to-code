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
      <SandpackLayout>
        <MonacoEditor />
        {(showPanelTest || showPanelPreview) && (
          <div className="h-screen w-1/4 resize">
            <Tabs
              className={"tabs tabs-boxed"}
              forceRenderTabPanel
              disabledTabClassName="tab"
              selectedTabClassName="tab-active"
            >
              <div className="flex flex-col">
                <div className="item w-screen">
                  <TabList>
                    <Tab className={"tab"}>Preview</Tab>
                    <Tab className={"tab"}>Tests</Tab>
                  </TabList>
                </div>
                <div className="item w-screen h-screen">
                  <TabPanel>
                    <SandpackPreview className="w-screen h-screen" />
                  </TabPanel>
                  <TabPanel>
                    <SandpackTests className="w-screen h-screen" />
                  </TabPanel>
                </div>
              </div>
            </Tabs>
          </div>
        )}
      </SandpackLayout>
    </SandpackProvider>
  );
}

export default EditorProvider;
