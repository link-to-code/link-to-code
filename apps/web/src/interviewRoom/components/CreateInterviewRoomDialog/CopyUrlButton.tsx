import React, { useState } from "react";
// import { CheckIcon } from "@heroicons/react/24/outline";
import { Button, Tooltip } from "@link-to-code/ui";

export interface CopyUrlButtonProps {
  url: string;
}

export const CopyUrlButton: React.FC<CopyUrlButtonProps> = ({ url }) => {
  const [tooltipOpened, setTooltipOpened] = useState(false);
  const onCopyClick = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setTooltipOpened(true);
        setTimeout(() => setTooltipOpened(false), 2500);
      })
      .catch(console.error);
  };

  return (
    <Tooltip position="left" tip="Copied" type="success" opened={tooltipOpened}>
      <Button type="primary" size="xs" onClick={onCopyClick}>
        Copy
      </Button>
    </Tooltip>
  );
};
