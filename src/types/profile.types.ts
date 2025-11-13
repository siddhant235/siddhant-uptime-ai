export interface Profile {
    username: string;
    name: string;
    avatar: string;
    bio: {
        title: string;
        skills: string[];
        location: string;
        email: string;
        website: string;
        twitter?: string;
    };
    stats: {
        followers: number;
        following: number;
    };
    achievements: Achievement[];
    organizations: Organization[];
}

export interface Achievement {
    id: string;
    icon: string;
    name: string;
    description: string;
}

export interface Organization {
    id: string;
    name: string;
    avatar: string;
    url: string;
}

