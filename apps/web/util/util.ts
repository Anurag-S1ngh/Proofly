import axios from "axios";

export async function SignUpHandler(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_HTTP_URL! + "/signup",
    {
      firstName,
      lastName,
      email,
      password,
    },
  );
  if (response.data.msg === "sign up successful") {
    return true;
  }
  return false;
}

export async function SignInHandler(email: string, password: string) {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_HTTP_URL! + "/signin",
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
}

export async function SpaceCreationHandler(
  testimonialTitle: string,
  testimonialDescription: string,
  projectName: string,
  question: string,
) {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_HTTP_URL! + "/space",
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
    process.env.NEXT_PUBLIC_HTTP_URL! + "/space/" + linkId,
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
  const response = await axios.get(
    process.env.NEXT_PUBLIC_HTTP_URL! + "/all-spaces",
    {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    },
  );
  if (response.data.msg === "all spaces fetched") {
    return response.data.spaces;
  }
  return false;
}

export async function SubmitTestimonialHandler(
  linkId: string,
  description: string,
  stars: number,
) {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_HTTP_URL! + "/" + linkId,
    {
      description,
      stars,
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
    process.env.NEXT_PUBLIC_HTTP_URL! + "/walloffame/" + testimonialId,
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

let stream: MediaStream | null = null;
let isPause: boolean = false;
export async function getMedia(video: any) {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 },
      },
      audio: true,
    });
    video!.srcObject = stream;
    await video.play();
  } catch (err) {
    console.log(err);
    alert(err);
  }
}

export function StopVideo() {
  if (!stream) {
    return;
  }

  stream.getTracks().forEach((track) => {
    if (track.readyState == "live") {
      track.stop();
    }
  });
}

export function PauseVideo(video: any, canvas: any) {
  if (!stream || isPause) {
    return;
  }
  isPause = true;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Hide video, show canvas
  video.style.display = "none";
  canvas.style.display = "block";
}

export function ResumeVideo(video: any, canvas: any) {
  isPause = false;
  if (!stream) return;

  canvas.style.display = "none";
  video.style.display = "block";

  video.play();
}
