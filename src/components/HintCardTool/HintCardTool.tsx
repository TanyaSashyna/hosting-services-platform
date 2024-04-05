import React, { FC, useState } from "react";
import { HintCard, Button, Link } from "@project-name-frontend/ui-package";

import { ButtonGroup, TextWrap } from "./HintCardTool.styles";

export const HintCardTool: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return open ? (
    <HintCard
      header="What is Tool?"
      body={[
        {
          key: 1,
          content: (
            <>
              <div>
                Tool is a secure, scalable system of servers that store (cache)
                website content closer to end users. Our collaboration with{" "}
                <Link href="https://..." newTab={true}>
                  Fastly
                </Link>{" "}
                lets you add Tool straight from your control panel to your chosen
                domain.
              </div>
              <div className="hintCard__head">How does it work?</div>
              <TextWrap>
                Tool acts as a temporary house for your website’s content. When a
                customer visits your domain, Tool:
              </TextWrap>
            </>
          ),
        },
      ]}
      list={[
        {
          key: 1,
          content: "Compresses your web files to improve load times.",
        },
        {
          key: 2,
          content:
            "Locates the nearest available server, delivering cached content to your end user, directly at the edge.",
        },
      ]}
      listClassName="hintCard__body__listOne"
      onClose={(): void => setOpen(false)}
    />
  ) : (
    <ButtonGroup layout="right">
      <Button
        buttonType="borderless"
        onClick={(): void => setOpen(true)}
        rightIcon="keyboard_arrow_down"
        className="hint-btn"
      >
        About Tool
      </Button>
    </ButtonGroup>
  );
};

HintCardTool.displayName = "HintCardTool";
