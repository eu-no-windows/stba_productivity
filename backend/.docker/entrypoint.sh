#!/bin/bash

npm install
npm run build
npm run typeorm --  -d ./src/database/data-source.ts  migration:run
npm run dev