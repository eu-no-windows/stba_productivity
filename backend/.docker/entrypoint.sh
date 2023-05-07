#!/bin/bash

npm install
npm run build
npx run typeorm --  -d ./src/database/data-source.ts  migration:run
npm run dev