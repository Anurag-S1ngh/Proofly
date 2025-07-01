import axios from "axios";

let stream: MediaStream | null = null;
let mediaRecorder: MediaRecorder | null = null;
let chunks: Blob[] = [];
let isPause: boolean = false;
export async function getMedia(video: any) {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { min: 1024, ideal: 1920, max: 3840 },
        height: { min: 576, ideal: 1080, max: 2160 },
      },
      audio: true,
    });
    video!.srcObject = stream;
    await video.play();
  } catch (err) {}
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

export function StartRecord(
  videoElement: HTMLVideoElement,
  videoElement2: HTMLVideoElement,
) {
  videoElement.style.display = "block";
  videoElement2.style.display = "none";
  if (!stream) {
    return;
  }
  chunks = [];
  mediaRecorder = new MediaRecorder(stream, {
    mimeType: "video/webm; codecs=vp9",
  });
  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      chunks.push(e.data);
    }
  };
  mediaRecorder.start();
}

export function StopRecord(
  videoElement: HTMLVideoElement,
  videoElement2: HTMLVideoElement,
) {
  if (!mediaRecorder) {
    return;
  }
  mediaRecorder.stop();
  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const videoURL = URL.createObjectURL(blob);
    videoElement.style.display = "none";
    videoElement2.style.display = "block";
    videoElement2.src = videoURL;
    videoElement2.controls = true;
  };
}

export async function UploadVideo(videoElement2: HTMLVideoElement) {
  if (!videoElement2.src) {
    return;
  }
  let blob = new Blob(chunks, { type: "video/webm" });
  const response = await axios.get(process.env.NEXT_PUBLIC_HTTP_URL! + "/url", {
    headers: {
      Authorization: localStorage.getItem("Authorization") as string,
    },
  });
  if (response.data.msg != "url generated") {
    return;
  }
  const fileUploadResponse = await axios.put(response.data.url, blob, {
    headers: {
      "Content-Type": "video/webm",
    },
  });
  if (fileUploadResponse.status === 200) {
    return response.data.id;
  }
  return false;
}

export async function ListAllDevices() {
  let devices: MediaDeviceInfo[] =
    await navigator.mediaDevices.enumerateDevices();
  devices = devices.filter(
    (device: MediaDeviceInfo) => device.kind === "audioinput",
  );
  console.log(devices);
  return devices;
}
