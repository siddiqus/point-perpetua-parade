import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Person {
  name: string;
  email: string;
  department: string;
  profile_pic_url: string;
}

interface RecognitionCardProps {
  amount: number;
  reason: string;
  giver: Person;
  receiver: Person;
  className?: string;
}

function clipName(name: string) {
  // const split = name.split(" ");

  // if (split.length > 2) {
  //   return `${split[0]} ${split[1]}.`;
  // }
  return name;
}

const RecognitionCard = ({
  amount,
  reason,
  giver,
  receiver,
  className,
}: RecognitionCardProps) => {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className={cn("w-full my-4 overflow-hidden card-animate", className)}>
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div
            className="flex flex-col items-center text-center"
            style={{ width: "150px" }}
          >
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage
                src={giver.profile_pic_url}
                alt={clipName(giver.name)}
              />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {getInitials(giver.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs mt-1 font-medium">
              {clipName(giver.name)}
            </span>
            <span className="text-xs text-muted-foreground">
              {giver.department}
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <div className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full text-sm mb-1">
              +{amount} points
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            {/* <div className="text-sm mt-1">gave points to</div> */}
          </div>

          <div
            className="flex flex-col items-center text-center"
            style={{ width: "150px" }}
          >
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage
                src={receiver.profile_pic_url}
                alt={clipName(receiver.name)}
              />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {getInitials(receiver.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs mt-1 font-medium">
              {clipName(receiver.name)}
            </span>
            <span className="text-xs text-muted-foreground">
              {receiver.department}
            </span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg text-center">
          <p className="italic">"{reason}"</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecognitionCard;
