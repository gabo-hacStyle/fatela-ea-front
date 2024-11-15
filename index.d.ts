export type LoginBody = {
    email: string;
    password: string;
}
export type ResponseBody = {
    token: string;
    roles: {authority: string}[];
    email: string;
    authenticated: boolean;
}

export type UpdateUserType = {
    userId: number;
    userDto: {
        name: string | null;
        email: string | null;
        enabled: boolean | null;
        countryId: number | null;
        roles: string[] | null;
    }
}

export type CreateUserType = {
    name: string;
    email: string;
    password: string;
    enabled: boolean;
    countryId: number;
    roles: string[];
}

export type CreateAdminType = {
    name: string;
    email: string;
    password: string;
    enabled: boolean;
    countryId: number;   
}

export type User = {
    userId: number;
    name: string;
    email: string;
    enabled: boolean;
    country: {
        countryId: number;
        countryName: string;
    };
    roles: string[];
};
export type Course = {
    courseCode: string;
    courseName: string;
    courseTeacher: string;
    year: number;
    courseProgram: string;
}
export type CourseList = string[];

export type Program = {
    name: string;
    programCode: string;
    status: string;
    courses: Course[];   
}

export type Student = {
    studentCode: string;
    studentName: string;
    studentGender: string;
    studentEmail: string;
    modificationDate: string;
}

export type Note = {
    studentCode: string;
    courseCode: string;
    studentCountryId: number;
    approved: 'N' | 'S';
    grade: number | null;
    status: string;
    year: number;
    studentName: string;
    studentGender: string;
    studentEmail: string | null;
    studentCountryName: string;
    courseTeacher: string | null;
    courseProgram: string;
}
export type Country ={
    countryId: number;
    countryName: string;
}

export type NotesByCountry = {
    quantity: number;
    grades: Note[];
}

export type StudentsCountByConutry = {
    count: number;
    country: string;
}

export type QuantityInfo = {
    totalStudents: number;
    totalCourses: number;
    totalFemales: number;
    totalMales: number;
    studentsByCountry: StudentsCountByConutry[]
}