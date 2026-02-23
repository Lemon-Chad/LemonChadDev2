
// $(".project-collapse-button").on("click", () => {
//     $(".projects-list").toggleClass("collapsed-projects");
//     if ($(".projects-list").hasClass("collapsed-projects")) {
//         $(".project-collapse-button > p").text("+");
//         $(".projects-list").css("max-height", 0);
//     } else {
//         $(".project-collapse-button > p").text("-");
//         const height = $(".projects-list")[0].scrollHeight + 'px';
//         $(".projects-list").css("max-height", height);
//     }
// });

function toggleCollapse(button, section) {
    section.toggleClass("collapsed-projects");
    if (section.hasClass("collapsed-projects")) {
        button.children().text("+")
        section.css("max-height", 0);
    } else {
        button.children().text("-");
        const height = section[0].scrollHeight + 'px';
        section.css("max-height", height);
    }
}

/*
Ex:
"machine_learning": {
    "title": "Machine Learning",
    "projects": [
        {
            "name": "Iris",
            "desc": "Iris is super cool",
            "github": "https://github.com/jacobselbo/iris",
            "img": "assets/projects/iris.png"
        },
        {
            "name": "NueroEv-AugTopologies",
            "desc": "I implemented NEAT",
            "github": "https://github.com/Lemon-Chad/NeuroEv-AugTopologies"
        }
    ]
}
*/

const GITHUB_SVG = `
<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.475 2 2 6.475 2 12C2 16.425 4.8625 20.1625 8.8375 21.4875C9.3375 21.575 9.525 21.275 9.525 21.0125C9.525 20.775 9.5125 19.9875 9.5125 19.15C7 19.6125 6.35 18.5375 6.15 17.975C6.0375 17.6875 5.55 16.8 5.125 16.5625C4.775 16.375 4.275 15.9125 5.1125 15.9C5.9 15.8875 6.4625 16.625 6.65 16.925C7.55 18.4375 8.9875 18.0125 9.5625 17.75C9.65 17.1 9.9125 16.6625 10.2 16.4125C7.975 16.1625 5.65 15.3 5.65 11.475C5.65 10.3875 6.0375 9.4875 6.675 8.7875C6.575 8.5375 6.225 7.5125 6.775 6.1375C6.775 6.1375 7.6125 5.875 9.525 7.1625C10.325 6.9375 11.175 6.825 12.025 6.825C12.875 6.825 13.725 6.9375 14.525 7.1625C16.4375 5.8625 17.275 6.1375 17.275 6.1375C17.825 7.5125 17.475 8.5375 17.375 8.7875C18.0125 9.4875 18.4 10.375 18.4 11.475C18.4 15.3125 16.0625 16.1625 13.8375 16.4125C14.2 16.725 14.5125 17.325 14.5125 18.2625C14.5125 19.6 14.5 20.675 14.5 21.0125C14.5 21.275 14.6875 21.5875 15.1875 21.4875C17.1727 20.8173 18.8977 19.5415 20.1198 17.8395C21.3419 16.1376 21.9995 14.0953 22 12C22 6.475 17.525 2 12 2Z" stroke="#000000" stroke-linejoin="round"/>
</svg>
`;

const WEBSITE_SVG = `
<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V15C22 16.6569 20.6569 18 19 18H13V19H15C15.5523 19 16 19.4477 16 20C16 20.5523 15.5523 21 15 21H9C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19H11V18H5C3.34315 18 2 16.6569 2 15V6ZM5 5C4.44772 5 4 5.44772 4 6V15C4 15.5523 4.44772 16 5 16H19C19.5523 16 20 15.5523 20 15V6C20 5.44772 19.5523 5 19 5H5Z" fill="#000000"/>
</svg>
`;

function createButton(href, svg) {
    const button = $("<a/>", {
        "class": "socialbutton",
        "href": href
    });
    
    button.append($(svg));

    return button;
}

function loadProject(project) {
    const projectSection = $("<div/>", {
        "class": "project-section"
    });

    // Create text section
    const projectText = $("<div/>", {
        "class": "project-text"
    });
    projectSection.append(projectText);

    projectText.append($(`<h1>${project.name}</h1>`, {
        "class": "project-name"
    }));
    projectText.append($(`<div/>`, {
        "class": "divider"
    }));
    projectText.append($(`<p>${project.desc}</p>`, {
        "class": "project-desc"
    }));
    

    // Create image/link section
    const projectVisuals = $("<div/>", {
        "class": "project-visuals"
    });
    projectSection.append(projectVisuals);

    // add thumbnail image if it exists
    if (project.hasOwnProperty("img"))
        projectVisuals.append($("<img/>", {
            "class": "project-img",
            "src": project.img
        }));

    const projectLinks = $("<div/>", {
        "class": "project-links"
    });
    projectVisuals.append(projectLinks);

    // add github if it exists
    if (project.hasOwnProperty("github"))
        projectLinks.append(createButton(project.github, GITHUB_SVG));
    
    // add website if it exists
    if (project.hasOwnProperty("site"))
        projectLinks.append(createButton(project.site, WEBSITE_SVG));

    return projectSection;
}

function loadProjects(projectSections, projectsDiv) {
    for (const category in projectSections) {
        const title = projectSections[category].title;
        const projects = projectSections[category].projects;

        const section = $("<div/>", {
            "class": "project-category"
        });
        projectsDiv.append(section);

        // create header text
        const categoryHeaderDiv = $("<div/>", { 
            "class": "category-header" 
        });
        section.append(categoryHeaderDiv);

        const categoryHeader = $(`<h1>${title} (${projects.length})</h1>`);
        categoryHeaderDiv.append(categoryHeader);

        const projectCollapseButton = $("<div/>", {
            "class": "project-collapse-button"
        });
        projectCollapseButton.append($("<p/>").text("+"));

        categoryHeaderDiv.append(projectCollapseButton);

        // create list of projects

        const projectList = $("<div/>", {
            "class": "collapsed-projects projects-list"
        });
        section.append(projectList);

        // Load projects into list
        for (let i = 0; i < projects.length; i++) {
            projectList.append(loadProject(projects[i]));

            // divide projects, but no trailing divider
            if (i + 1 < projects.length)
                projectList.append($("<div/>", {
                    "class": "divider"
                }));
        }

        // make button function
        projectCollapseButton.on(
            "click", 
            () => toggleCollapse(
                projectCollapseButton, 
                projectList
            )
        );
    }
}

$(() => {
    const projectsDiv = $("#all-projects");
    projectsDiv.append
    $.getJSON("assets/projects.json")
        .then(json => loadProjects(json, projectsDiv));
})
