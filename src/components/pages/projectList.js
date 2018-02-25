import React from "react";
import redBeanie from "../../Assets/media/images/redBeanie.png";
import snap1 from "../../Assets/media/images/snap/SNAP.png";
import snap2 from "../../Assets/media/images/snap/snap_frontEnd.png";

export const ProjectList = [
    {
      projects: [
      {
        title: "Project 1",
        description: <div>
          <p>Once code sketch a day, usually dealing with HTML canvas animations and quick generative art.</p>
        </div>,
        tools: ["HTML Canvas", "React", "Sass", "Gulp"],
        link: "/sketches",
      },
      {
        title: "Project 2",
        description: <div>
          <p>After Umbel moved into our new office in the old Power Plant, we wanted to make a great first impression with our entrance screens. I wanted to build an interface that keeps visitors and employees informed about the weather, especially useful for planning the best bike ride home.</p>
          <p>I built a standalone web app that pulls current weather data from the <a href="https://developer.forecast.io/">Dark Sky Forecast API</a> and displays today's temperature, precipitation, and sunset forecast. A clock-like layout keeps the interface familiar and easy to understand.</p>
          <p>Future plans are to use Google Calendar data to display today's company events.</p>
        </div>,
        tools: ["Angular", "D3.js", "Dark Sky Forecast API","SCSS"],
        images: [snap1,snap2]
      },
      {
        title: "Project 3",
        description: <div>
          <p>After Umbel moved into our new office in the old Power Plant, we wanted to make a great first impression with our entrance screens. I wanted to build an interface that keeps visitors and employees informed about the weather, especially useful for planning the best bike ride home.</p>
          <p>I built a standalone web app that pulls current weather data from the <a href="https://developer.forecast.io/">Dark Sky Forecast API</a> and displays today's temperature, precipitation, and sunset forecast. A clock-like layout keeps the interface familiar and easy to understand.</p>
          <p>Future plans are to use Google Calendar data to display today's company events.</p>
        </div>,
        tools: ["Angular", "D3.js", "Dark Sky Forecast API","SCSS"],
        images: [snap1,snap2]
      },
    ]
  },
]
