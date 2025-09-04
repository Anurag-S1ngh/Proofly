import axios from "axios";

export async function SignUpHandler(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_HTTP_URL! + "/api/v1/auth/signup",
      {
        firstName,
        lastName,
        email,
        password,
      },
    );
    if (response.data.msg === "sign up successful") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.msg;
    }
    return false;
  }
}

export async function SignInHandler(email: string, password: string) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_HTTP_URL! + "/api/v1/auth/signin",
      {
        email,
        password,
      },
    );
    if (response.data.msg === "sign in successful") {
      localStorage.setItem("Authorization", response.data.token);
      return true;
    }
    return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.msg);
      return error.response?.data.msg;
    }
    return false;
  }
}

export async function SpaceCreationHandler(
  testimonialTitle: string,
  testimonialDescription: string,
  projectName: string,
  question: string,
) {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_HTTP_URL! + "/api/v1/space",
    {
      testimonialTitle,
      testimonialDescription,
      projectName,
      question,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    },
  );
  if (response.data.msg === "project created") {
    return response.data.linkId;
  }
  return false;
}

export async function GetSpaceQuestion(linkId: string) {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_HTTP_URL! + "/api/v1/space/" + linkId,
    {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    },
  );
  if (response.data.msg === "space fetched") {
    return response.data.space;
  }
  return false;
}

export async function GetSpaceDetails(linkId: string) {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_HTTP_URL! + "/dashboard/" + linkId,
    {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    },
  );
  if (response.data.msg === "space fetched") {
    return response.data.space;
  }
  return false;
}

//dashboard page.tsx
export async function GetAllSpacesDetails() {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_HTTP_URL! + "/api/v1/all-spaces",
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      },
    );
    if (response.data.msg === "all spaces fetched") {
      return response.data.spaces;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function SubmitTestimonialHandler(
  linkId: string,
  stars: number,
  type: "video" | "text" = "text",
  id?: string,
  description?: string,
) {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_HTTP_URL! + "/api/v1/" + linkId,
    {
      description,
      id,
      stars,
      type,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    },
  );
  if (response.data.msg === "thank you for the review") {
    return true;
  }
  return false;
}

export async function UpdateWallOfFame(
  testimonialId: string,
  inWallOfFame: boolean,
) {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_HTTP_URL! + "/api/v1/walloffame/" + testimonialId,
    {
      inWallOfFame,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    },
  );
  if (response.data.msg === "wall of fame updated") {
    return true;
  }
  return false;
}

export async function GetWallOfFame(userId: string) {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_HTTP_URL! + "/api/v1/walloffame/" + userId,
  );
  if (response.data.msg === "wallofFame fetched") {
    return response.data.wallOfFame;
  }
  return false;
}
