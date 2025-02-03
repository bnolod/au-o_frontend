export default function ProfileImage({className}:{className?:string}){
    return (
        <img
            src="examples/profile.png"
            alt="profile_image"
            className={"rounded-full h-10 w-10 " + className}
          />
    )
}