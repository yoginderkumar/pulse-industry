import GetStarted from "../assets/images/GetStarted.png";
import { Button } from "../components";

export default function GetStartedPage() {
  return (
    <div className="py-12">
      <div className="flex flex-col gap-6">
        <div className="px-12 text-center flex flex-col gap-1">
          <h3 className="font-bold">Welcome to Pulse Inventory</h3>
          <p className="px-12 text-sm">
            Manage all of your inventory from multiple stores in one app.
          </p>
        </div>
        <img alt="Logo" src={GetStarted} className="px-16 " />
      </div>
      <div className="px-6 pb-12 text-center absolute bottom-0 w-full">
        <div className="flex flex-col gap-2">
          <Button fullWidth path="/login">
            Login
          </Button>
          <p className="text-sm">
            Don't have an account?{" "}
            <a className="font-bold" href="/sign-up">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
