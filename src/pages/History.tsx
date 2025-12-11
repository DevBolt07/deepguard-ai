import BottomTabBar from "@/components/BottomTabBar";
import { Clock, FileImage, FileVideo, Link2 } from "lucide-react";

const History = () => {
  const historyItems = [
    {
      id: 1,
      type: "image",
      name: "profile_photo.jpg",
      date: "Today, 2:30 PM",
      status: "Authentic",
      icon: FileImage,
    },
    {
      id: 2,
      type: "video",
      name: "interview_clip.mp4",
      date: "Yesterday, 4:15 PM",
      status: "Suspicious",
      icon: FileVideo,
    },
    {
      id: 3,
      type: "url",
      name: "youtube.com/watch...",
      date: "Dec 10, 11:00 AM",
      status: "Authentic",
      icon: Link2,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-4 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-foreground">History</h1>
        <p className="text-sm text-muted-foreground mt-1">Your recent scans</p>
      </div>

      {/* History List */}
      <div className="px-4 space-y-3">
        {historyItems.length > 0 ? (
          historyItems.map((item) => (
            <div
              key={item.id}
              className="glass-card p-4 flex items-center gap-4"
            >
              <div className="p-3 rounded-xl bg-secondary">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  item.status === "Authentic"
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Clock className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No scan history yet</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Start scanning media to see results here
            </p>
          </div>
        )}
      </div>

      <BottomTabBar />
    </div>
  );
};

export default History;
