import BackButton from '@/app/ui/BackButton';
import Container from '@/app/ui/Container';

export default function InfoPage() {
  return (
    <Container>
      <p className="justify-center">
        Created by Andy Frisella, The "Power List" is a list of 3-5 critical
        tasks you must complete each day that will help you make progress
        towards your goals in life. At the end of the day, if you have completed
        each task, mark that day with a big{' '}
        <span className="text-green-500 font-bold">W</span>, if not an{' '}
        <span className="text-red-500 font-bold">L</span>. Personally, this has
        helped me tremendously in focusing on learning new technologies
        incrementally, step by step, and not getting ahead of myself. We all
        know how much information there is in the software development world,
        and if you don't take actionable steps to progress yourself, you will
        become stagnant. <span className="font-bold">Now is the time.</span>{' '}
        <span className="font-bold">No more excuses</span>. Iv'e handled
        everything for you.
      </p>
      <div className="text-center mt-4">
        <BackButton className="text-blue-600 font-bold hover:text-blue-700">
          Give it a try!
        </BackButton>
      </div>
      <br />
      <a
        href="https://andyfrisella.com/blogs/articles/critical-power-list-tasks"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="text-center mt-2 font-extralight text-sm hover:text-slate-600">
          Read more about the "Power List"
        </p>
      </a>{' '}
    </Container>
  );
}
