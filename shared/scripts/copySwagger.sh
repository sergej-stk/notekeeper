#!/bin/bash
FOLDER="../docs/swagger"
rm $FOLDER/*
cp gen/proto/* $FOLDER
rm -r gen/proto
