export default function PostImage({ src }: { src: string }) {
  return (
    <div className="h-96 flex items-center justify-center">
        <img src={src} alt="" className="object-contain max-w-full max-h-full"/>

    </div>
  );
}
