#!/bin/bash
FRONTEND_SRC="../frontend/src"
BACKEND_SRC="../backend/src"
rm -r $FRONTEND_SRC/shared
rm -r $BACKEND_SRC/shared
cp -r ../shared $FRONTEND_SRC/shared
cp -r ../shared $BACKEND_SRC/shared
