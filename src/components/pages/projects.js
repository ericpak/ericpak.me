import React, { Component } from 'react';
import classNames from "classnames";
import ProjectItem from "./projectItem";

// Images for project
import deckardCainHelp from "../../Assets/media/images/deckardCain/deckard_cain_help.png";
import deckardCainMonk from "../../Assets/media/images/deckardCain/deckard_cain_monk_kr.png";
import deckardCainTeam4 from "../../Assets/media/images/deckardCain/deckard_cain_team4.png";

import redBeanie from "../../Assets/media/images/ericpak/redBeanie.png";
import hi from "../../Assets/media/images/ericpak/hi.png";
import mtBear from "../../Assets/media/images/ericpak/mountainBear3.png";
import toolbar from "../../Assets/media/images/ericpak/toolbar.png";
import gameDay1 from "../../Assets/media/images/game/gameDev_day1.png";
import gameDay3 from "../../Assets/media/images/game/gameDev_day3.png";
import gameDay5 from "../../Assets/media/images/game/gameDev_day5.png";

import snap from "../../Assets/media/images/snap/SNAP.png";
import snap_moby from "../../Assets/media/images/snap/moby_dick.png";
import snap_frontend from "../../Assets/media/images/snap/snap_frontEnd.png";
import snap_zoom1 from "../../Assets/media/images/snap/snap_zoomed1.png";
import snap_zoom2 from "../../Assets/media/images/snap/snap_zoomed2.png";
import snap_solid from "../../Assets/media/images/snap/solid_layout.png";

import rilke from "../../Assets/media/images/rilke/rilke_homepage.png";
import management from "../../Assets/media/images/rilke/rilke_adminFieldtripManagement.png";
import viewTrips from "../../Assets/media/images/rilke/rilke_viewAllTrips.png";
import addTrip from "../../Assets/media/images/rilke/rilke_addTrip.png";
import rilkeLogin from "../../Assets/media/images/rilke/rilke_login.png";
import manageStudent from "../../Assets/media/images/rilke/rilke_manageStudent.png";
import slip from "../../Assets/media/images/rilke/rilke_permissionSlip.png";

// Nav and footer height
const navFooterHeight = 44;

// ▴Home

class Projects extends Component {
  getClassName() {
    return classNames("Projects");
  }

  constructor(){
    super();
    this.state = {
      projects: [],
    }
  }

  componentDidMount(){
    var paintCanvas = document.getElementsByClassName("PaintCanvas")[0].style;
    paintCanvas.top = (-window.innerHeight + navFooterHeight) + "px";
    paintCanvas.bottom = (window.innerHeight - navFooterHeight) + "px";

    var ballCanvas = document.getElementsByClassName("BallCanvas")[0].style;
    ballCanvas.top = (-window.innerHeight + navFooterHeight) + "px";
    ballCanvas.bottom = (window.innerHeight - navFooterHeight) + "px";

    var toolbar = document.getElementsByClassName("toolbar")[0].style;
    toolbar.top = "-40px";
    toolbar.bottom = "40px";

    var header = document.getElementsByClassName("Header")[0].style;
    header.position = "absolute";
    header.height = "100vh";

    var footer = document.getElementsByClassName("Footer")[0].style;
    footer.position = "relative";
  }

  componentWillMount(){
    this.setState({
      projects: [
        {
          title: 'Deckard Cain: a Diablo 3 Discord bot',
          technologies: ['Javascript', 'Nodejs','AWS EC2', 'enmap-level'],
          description: <p>A Discord bot for Diablo 3. It calls on the Blizzard API to get data on the ladder. It can pull information from any ladder regardless of the region, ranking, and season. This bot lives on the AWS EC2 server for 24/7 availability. The code can be found on my <a href="https://github.com/ericpak/Deckard-Cain">Github</a> Site or for more details on the bot you can click <a href="https://ericpak.github.io/Deckard-Cain/">Here</a>.</p>,
          images: [
            {
              image: deckardCainHelp,
              imageAlt: 'Help',
              imageTitle: 'help',
              description: "Getting info on the commands for the bot.",
            },
            {
              image: deckardCainMonk,
              imageAlt: 'Monk',
              imageTitle: 'monk',
              description: 'Getting information on the monk ladder on the korean servers.',
            },
            {
              image: deckardCainTeam4,
              imageAlt: 'Team 4',
              imageTitle: 'team4',
              description: 'Getting information on the ladder for teams of 4.',
            },
          ],
        },
        {
          title: 'ericpak.me',
          technologies: ['HTML', 'React', 'Sass', 'Gulp', 'AWS', 'HTML Canvas'],
          description: 'This is a project of mine to create an online portfolio using React, Sass, and Gulp. It is currently being hosted on AWS S3 using AWS route 53. This is my current project and is still being updated.',
          images: [
            {
              image: hi,
              imageAlt: 'Hi',
              imageTitle: 'Hi',
              description: "The front page of my website! It's also a paint Canvas!",
            },
            {
              image: redBeanie,
              imageAlt: 'Red Beanie',
              imageTitle: 'redbeanie',
              description: 'I wear beanies very often so i drew a red beanie for my favicon.',
            },
            {
              image: mtBear,
              imageAlt: 'Mountain Bear',
              imageTitle: 'mtBear',
              description: 'A bear under some mountains.',
            },
            {
              image: toolbar,
              imageAlt: 'Toolbar',
              imageTitle: 'toolbar',
              description: 'The toolbars for the canvases.',
            },
            {
              image: gameDay1,
              imageAlt: 'Game Development Day 1',
              imageTitle: 'gameDay1',
              description: 'The first day of the Development of the game! Worked on basic functionality and game framework!',
            },
            {
              image: gameDay3,
              imageAlt: 'Game Development Day 3',
              imageTitle: 'gameDay3',
              description: 'On Day 3 of Game Development i added a turret with bullets, and the perk system!.',
            },
            {
              image: gameDay5,
              imageAlt: 'Game Development Day 5',
              imageTitle: 'gameDay5',
              description: 'On day 5 of Game Dev i added stars, explosions, and lasers!',
            },
          ],
        },
        {
          title: 'Semantic Network Analysis Pipeline',
          technologies: ['Python', 'Java', 'NLTK', 'Javascript', 'PHP', 'HTML', 'Partiview', 'Gephi'],
          description: 'Semantic Network Analysis Pipeline (SNAP) is a data visualization tool. By rendering many 2D networks as a 3D network visualization, a user can view changes in a network by seeing communities of nodes growing and shrinking over periods of time. With 3D representation, the user should be able to find patterns of growth and change in time within a given subject that would not be apparent when viewing a single document\'s semantic network at a time. SNAP is a website that ties together four modules for a user to upload raw timestamped text documents and perform: Natural Language Processing, Undirected Graph Network Generation, Network Analysis, and 3D Network Visualization. Each module takes the output of the preceding module as input.',
          images: [
            {
              image: snap_frontend,
              imageAlt: 'SNAP frontend',
              imageTitle: 'frontend',
              description: 'The frontend of the pipeline',
            },
            {
              image: snap,
              imageAlt: 'wire mesh',
              imageTitle: 'wire',
              description: 'A 3D visualization using the wire mesh layout',
            },
            {
              image: snap_solid,
              imageAlt: 'solid mesh',
              imageTitle: 'solid',
              description: 'A 3D visualization using the solid mesh layout',
            },
            {
              image: snap_zoom1,
              imageAlt: 'zoomed in view',
              imageTitle: 'zoom1',
              description: 'A zoomed in view of a 3D visualization',
            },
            {
              image: snap_zoom2,
              imageAlt: 'another zoomed in view',
              imageTitle: 'zoom2',
              description: 'Another zoomed in view of a 3D visualization',
            },
            {
              image: snap_moby,
              imageAlt: 'moby_dick',
              imageTitle: 'moby_dick',
              description: 'The book moby dick after going through the pipeline',
            },
          ],
        },
        {
          title: 'Rilke Schule Field Trip Permission Slip',
          technologies: ['HTML', 'ASP.NET MVC', 'SQL', 'C#', 'Bootstrap'],
          description: 'Rilke Schule is a German school of arts and science charter school. The presented problem was managing student permission slips to be more convenient for all parties. The purposed solution was to make a web app where parents could sign off on their child(ren). The online solution removes the student as the middle man, which removes the unreliable delivery of the permission slip to and from the parent. It also reduces the use of paper.\n To develop our web app we decided to use ASP.NET MVC because the school district uses ASP.NET.',
          images: [
            {
              image: rilke,
              imageAlt: 'homepage',
              imageTitle: 'rilke',
              description: 'The homepage for Rilke Schule Permission Slip',
            },
            {
              image: management,
              imageAlt: 'management',
              imageTitle: 'management',
              description: 'The admin field trip management page.',
            },
            {
              image: viewTrips,
              imageAlt: 'view current field trips',
              imageTitle: 'viewTrips',
              description: 'The admin view of the trips. Here you can see who has signed their permission slip.',
            },
            {
              image: addTrip,
              imageAlt: 'add trip',
              imageTitle: 'addTrip',
              description: 'The admin add trip page. The admin can create new field trips here to be sent out to the parents of the appropriate class.',
            },
            {
              image: rilkeLogin,
              imageAlt: 'Rilke Schule login page',
              imageTitle: 'rilkeLogin',
              description: 'The Rilke Schule login page.',
            },
            {
              image: manageStudent,
              imageAlt: 'Manage Student Page',
              imageTitle: 'manageStudent',
              description: 'The users manage student page. Here you can view the students assigned to your account. You can also delete a student or add a new student of you know the correct credentials for the student.',
            },
            {
              image: slip,
              imageAlt: 'Permission slip page',
              imageTitle: 'slip',
              description: 'The permission slip page.',
            },
          ],
        },
      ]
    })
  }

  render() {
    let projectItems;
    projectItems = this.state.projects.map(project => {
      return (
        <ProjectItem key={project.title} project={project} />
      );
    });
    return (
      <div className="wrap projects">
        <h1>Projects</h1>
          {projectItems}
      </div>
    );
  }
}

export default Projects;
