# link-to-code

One click to tech test!

## Local development

### Installation

This app depends on `pnpm` and `node`, make sure those are installed to make changes locally.

**You can run this command to set it up.**

`pnpm install -g @microsoft/rush @rushstack/heft prettier firebase-tools && brew install openjdk@11`

Note: Open JDK is used to run `firebase-tools` locally. Remember to follow the instructions from the bre install command.

### Start developing

Start the functions package by doing the following:

- On one terminal, run `rush build:watch`
- In another terminal, run `cd ./app/functions && rushx emulation:start`
- To run the front end, open another terminal and run `cd ./app/web && rushx start`

