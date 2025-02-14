export default function ProfileImage({
  className,
  src = "examples/profile.png",
}: {
  className?: string;
  src?: string;
}) {
  return (
    <img
      src={src} 
      alt="profile_image"
      className={"rounded-full h-11 w-11 " + className}
    />
  );
}
