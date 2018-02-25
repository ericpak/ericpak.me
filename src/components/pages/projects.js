import React, { Component } from 'react';
import classNames from "classnames";
import ProjectItem from "./projectItem";

// Images for project
import redBeanie from "../../Assets/media/images/ericpak/redBeanie.png";
import hi from "../../Assets/media/images/ericpak/hi.png";
import snap from "../../Assets/media/images/snap/SNAP.png";
import snap_moby from "../../Assets/media/images/snap/moby_dick.png";
import snap_frontend from "../../Assets/media/images/snap/snap_frontEnd.png";
import snap_zoom1 from "../../Assets/media/images/snap/snap_zoomed1.png";
import snap_zoom2 from "../../Assets/media/images/snap/snap_zoomed2.png";
import snap_solid from "../../Assets/media/images/snap/solid_layout.png";
import rilke from "../../Assets/media/images/rilke-schule/rilke_homepage.png";

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

  componentWillMount(){
    this.setState({
      projects: [
        {
          title: 'ericpak.me',
          technologies: ['HTML', 'React', 'Sass', 'Gulp', 'AWS', 'HTML Canvas'],
          description: 'This was a personal project of mine to create an online portfolio using React, Sass, and Gulp. It is currently being hosted on AWS S3 using AWS route 53. This is my current project and is still being updated.',
          images: [
            {
              image: hi,
              imageAlt: 'Hi',
              imageTitle: 'Hi',
              description: 'The front page of my website!',
            },
            {
              image: redBeanie,
              imageAlt: 'Red Beanie',
              imageTitle: 'redbeanie',
              description: 'I wear beanies very often so i drew a red beanie for my favicon.',
            },
          ],
        },
        {
          title: 'Semantic Newtwork Analysis Pineline',
          technologies: ['Python', 'Java', 'NLTK', 'Javascript', 'PHP', 'HTML', 'Partiview', 'Gephi'],
          description: 'This project was on blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
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
          description: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
          images: [
            {
              image: redBeanie,
              imageAlt: 'Red Beanie',
              imageTitle: 'Huzzah',
              description: 'snap picture',
            }
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
      <div className="wrap">
        <h1>Projects</h1>
          {projectItems}
      </div>
    );
  }
}

export default Projects;
