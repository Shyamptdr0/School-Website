import HomePage from "@/app/krishna-academy-admin/Pages/Home/page";
import MandatoryPage from "@/app/krishna-academy-admin/Pages/Mandatory/page";
import FacultiesPage from "@/app/krishna-academy-admin/Pages/Faculties/page";
import ContactPage from "@/app/krishna-academy-admin/Pages/Contact/page";
import CurriculumUpload from "@/app/krishna-academy-admin/Pages/Curricullum/page";
import PhotoGallery from "@/app/krishna-academy-admin/Pages/Gallery/photo/page";
import AwardList from "@/app/krishna-academy-admin/Pages/Achievements/AwardList/page";

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
