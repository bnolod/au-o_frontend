import CommentBoard from "../components/CommentBoard";
import Header from "../components/Header";
import Post from "../components/Post";

export default function MainPage() {

const longText = "Lorem ipsum dolor sit amet, bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam consectetur adipiscing elit. Nullam nec purus nec nisl ultricies ultricies. Nullam nec purus nec nisl ultricies ultricies. Nullam nec purus nec nisl ultricies ultricies. Nullam nec purus nec nisl";

  return (
    <div className="bg-backgroundGradient bg-fixed min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col md:flex-row h-full items-center lg:items-start justify-center pt-20">
        <div className=" md:w-3/12 fixed left-0 bg-cyan-300">Bal oldali aside</div>
        <div className="w-11/12 md:w-5/12 flex flex-col">
          <Post src={"examples/k.jpg"} text="lorem"/>
          <Post src="examples/profile.png" text=""/>
          <Post src="vite.svg" text={longText}/>
        </div>
        <div className="md:w-3/12 fixed right-0 flex items-start">
        <CommentBoard/>
        </div>
      </main>
    </div>
  );
}
