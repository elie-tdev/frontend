#!/bin/bash

# If the folder already exists, then remove it recursively
FOLDER="pages"
if [ -d "$FOLDER" ]
then
  rm -r pages
fi

# make the folder to hold all our demo sites
mkdir pages
# make a folder for shared-frontend
mkdir pages/shared-frontend
# make a folder for pattern-sidebar-navigation
mkdir pages/pattern-sidebar-navigation

# recursively copy the contents of the {package}/pages/*
# folder for the above packages into the main pages folder
# created above
cp -a packages/shared-frontend/pages/. pages/shared-frontend/

cp -a packages/pattern-sidebar-navigation/pages/. pages/pattern-sidebar-navigation/

# move into the main pages directory
cd pages

# create a simple index.html file, to show what pages exist
touch index.html

# super simple navigation links for the index.html file
# this can be updated to be an actual html file we copy-
# and-paste at a later date.
echo "<a href="/shared-frontend">Shared Frontend</a><br><a href="/pattern-sidebar-navigation">Pattern: Sidebar Navigation</a>" >> index.html