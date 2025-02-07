import { useCommentBoard } from "../contexts/CommentContext";
import CommentBoard from "../components/commentboard/CommentBoard";
import Header from "../components/Header";
import Post from "../components/postcomponents/Post";


export default function MainPage() {

const longText = "Lorem ipsum dolor sit amet, bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam bam consectetur adipiscing elit. Nullam nec purus nec nisl ultricies ultricies. Nullam nec purus nec nisl ultricies ultricies. Nullam nec purus nec nisl ultricies ultricies. Nullam nec purus nec nisl";

  const {isOpen} = useCommentBoard();
  return (
    <div className="bg-backgroundGradient bg-fixed min-h-screen flex flex-col text-textColor">
      <Header />
      <main className="flex flex-col md:flex-row h-full items-center md:items-start justify-center pt-20">
        <div className=" md:w-3/12 fixed left-0 bg-cyan-50">Bal oldali aside</div>
        <div className="w-11/12 md:w-5/12 flex flex-col">
          <Post src={"vite.svg"} text="lorem"/>
          <Post src="examples/profile.png" text=""/>
          <Post src="vite.svg" text={longText}/>
        </div>
        <div className={"md:w-3/12 w-11/12 right-4 items-start " + (!isOpen ? "hidden" : "fixed flex")}>
        <CommentBoard/>
        </div>
      </main>
    </div>
  );
}
