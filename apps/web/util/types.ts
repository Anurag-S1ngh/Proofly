export interface UserInterface {
  firstName: string;
  lastName: string;
}

export interface TestimonialInterface {
  id: string;
  description: string;
  stars: number;
  sumbttedAt: string;
  user: UserInterface;
  inWallOfFame: boolean;
  videoURL: string | undefined;
  type: string | undefined;
}

export interface SpaceInterface {
  linkId: string;
  projectName: string;
  testimonials: TestimonialInterface[];
}

export interface AllSpacesInterface {
  linkId: string;
  projectName: string;
  _count: { testimonials: number };
}
