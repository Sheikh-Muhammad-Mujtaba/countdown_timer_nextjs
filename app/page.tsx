// Import the Countdown component from the specified path
import Countdown from "@/components/count-down";

// Define the Home component, which is the main component for this page
export default function Home() {
  return (
    <div>
      {/* Render the Countdown component inside a div */}
      <Countdown />
    </div>
  );
}
