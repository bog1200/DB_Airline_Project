import Job from "./Job";
import FlightCrew from "./FlightCrew";
interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    job_id: Job;
    crew_id: FlightCrew;
}
export = Employee;