#!/bin/bash
cd /home/kavia/workspace/code-generation/taskflow-97361-dfa4a55e/frontend_react_spa
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

