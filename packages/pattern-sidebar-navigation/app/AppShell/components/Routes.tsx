import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { ExamplePage } from './ExamplePage'

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<ExamplePage title={'Home'} />}></Route>
      <Route path="about">
        <Route
          path="history"
          element={<ExamplePage title={'About: History'} />}
        />
        <Route
          path="timeline"
          element={<ExamplePage title={'About: Timeline'} />}
        />
        <Route
          path="values"
          element={<ExamplePage title={'About: Values'} />}
        />
        <Route path="join">
          <Route
            path="first-steps"
            element={<ExamplePage title={'About|Join: First Steps'} />}
          />
          <Route
            path="culture"
            element={<ExamplePage title={'About|Join: Culture'} />}
          />
          <Route
            path="openings"
            element={<ExamplePage title={'About|Join: Openings'} />}
          />
          <Route
            path="how-to"
            element={<ExamplePage title={'About|Join: How To'} />}
          />
        </Route>
      </Route>
      <Route path="products">
        <Route path="base" element={<ExamplePage title={'Products: Base'} />} />
        <Route
          path="second"
          element={<ExamplePage title={'Products: Second'} />}
        />
        <Route path="lineup">
          <Route
            path="item-1"
            element={<ExamplePage title={'Products|Lineup: Item 1'} />}
          />
          <Route
            path="item-2"
            element={<ExamplePage title={'Products|Lineup: Item 2'} />}
          />
          <Route
            path="item-3"
            element={<ExamplePage title={'Products|Lineup: Item 3'} />}
          />
          <Route
            path="item-4"
            element={<ExamplePage title={'Products|Lineup: Item 4'} />}
          />
          <Route
            path="item-5"
            element={<ExamplePage title={'Products|Lineup: Item 5'} />}
          />
          <Route
            path="item-6"
            element={<ExamplePage title={'Products|Lineup: Item 6'} />}
          />
          <Route path="item-7">
            <Route
              path="intro"
              element={<ExamplePage title={'Products|Lineup|Item-7: Intro'} />}
            />
            <Route
              path="specs"
              element={<ExamplePage title={'Products|Lineup|Item-7: Specs'} />}
            />
            <Route
              path="more"
              element={<ExamplePage title={'Products|Lineup|Item-7: More'} />}
            />
            <Route
              path="details"
              element={
                <ExamplePage title={'Products|Lineup|Item-7: Details'} />
              }
            />
          </Route>
        </Route>
      </Route>
      <Route
        path="settings/all"
        element={<ExamplePage title={'Settings: all'} />}
      />
      <Route
        path="settings/other"
        element={<ExamplePage title={'Settings: other'} />}
      />
      <Route
        path="settings/something"
        element={<ExamplePage title={'Settings: something'} />}
      />
    </Routes>
  )
}
