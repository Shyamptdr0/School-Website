import HomePage from "@/app/school-admin/components/Pages/Home/page";
import MandatoryPage from "@/app/school-admin/components/Pages/Mandatory/page";
import FacultiesPage from "@/app/school-admin/components/Pages/Faculties/page";
import ContactPage from "@/app/school-admin/components/Pages/Contact/page";
import CurriculumUpload from "@/app/school-admin/components/Pages/Curricullum/page";
import PhotoGallery from "@/app/school-admin/components/Pages/Gallery/photo/page";
import AwardList from "@/app/school-admin/components/Pages/Achievements/AwardList/page";

export default function AllPages({ activePage }) {
    switch (activePage) {
        case "Home":
            return <HomePage />;
        case "Mandatory Disclosure":
            return <MandatoryPage />;
        case "Faculties":
            return <FacultiesPage />;
        case "Contact":
            return <ContactPage />;
        case "Curriculum Scheme":
            return <CurriculumUpload />;
        case "Photo":
            return <PhotoGallery />;
        case "Award List":
            return <AwardList/>;

        default:
            return (
                <div className="p-4">
                    <h2 className="text-xl font-semibold">Page Not Found</h2>
                    <p>No content available for {activePage}</p>
                </div>
            );
    }
}
