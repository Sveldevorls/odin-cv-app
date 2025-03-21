import { jsPDF } from "jspdf";
import InfoEditor from "./InfoEditor/InfoEditor"
import EducationEditor from "./EducationEditor/EducationEditor"
import ExperienceEditor from "./ExperienceEditor/ExperienceEditor"
import ProjectsEditor from "./ProjectsEditor/ProjectsEditor"
import SkillsEditor from "./SkillsEditor/SkillsEditor"
import ConfirmButton from "./ConfirmButton";
import "./Editor.css"

export default function Editor(props) {
    function handleDownloadClick() {
        const resumeDoc = new jsPDF("p", "pt", "a4");

        resumeDoc.html(
            document.body.querySelector(".CV"),
            {
                callback: resumeDoc => resumeDoc.save(),

                // Force content to fit into one page
                windowWidth: 793.7,
                width: 595,
            }
        )
    }

    function handleClearResumeClick() {
        props.onInfoFormChange({});
        props.onEducationFormChange([]);
        props.onExperienceFormChange([]);
        props.onProjectsFormChange([]);
        props.onSkillsFormChange([]);
    }

    return (
        <div className="Editor">
            <InfoEditor
                info={props.info}
                onFormChange={props.onInfoFormChange}
            />
            <EducationEditor
                education={props.education}
                onFormChange={props.onEducationFormChange}
            />
            <ExperienceEditor
                experience={props.experience}
                onFormChange={props.onExperienceFormChange}
            />
            <ProjectsEditor
                projects={props.projects}
                onFormChange={props.onProjectsFormChange}
            />
            <SkillsEditor
                skills={props.skills}
                onFormChange={props.onSkillsFormChange}
            />
            <ConfirmButton
                buttonClass="button-clear"
                onConfirm={handleClearResumeClick}
                warningMessage={<h3>This action can not be reversed. Are you sure?</h3>}
                confirmMessage="Yes, clear the resume"
            >
                <h3>Clear resume</h3>
            </ConfirmButton>
            <button className="button-download" onClick={handleDownloadClick}><h3>Download as PDF</h3></button>
        </div>
    )
}