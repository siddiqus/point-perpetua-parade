
import React, { useState, useEffect } from "react";
import RecognitionTicker from "@/components/RecognitionTicker";

// Mock data for demonstration
const mockRecognitions = [
  {
    amount: 50,
    reason_decoded: "Thank you for helping me with the project deadline. Your expertise was invaluable!",
    giver: {
      name: "Emma Thompson",
      email: "emma@example.com",
      department: "Engineering",
      profile_pic_url: "https://i.pravatar.cc/150?img=1",
    },
    receiver: {
      name: "John Davis",
      email: "john@example.com",
      department: "Product",
      profile_pic_url: "https://i.pravatar.cc/150?img=2",
    },
  },
  {
    amount: 25,
    reason_decoded: "Great presentation yesterday! You really impressed the clients.",
    giver: {
      name: "Michael Chen",
      email: "michael@example.com",
      department: "Sales",
      profile_pic_url: "https://i.pravatar.cc/150?img=3",
    },
    receiver: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      department: "Marketing",
      profile_pic_url: "https://i.pravatar.cc/150?img=4",
    },
  },
  {
    amount: 100,
    reason_decoded: "Your leadership on the new feature rollout was exceptional. The team really rallied behind your vision!",
    giver: {
      name: "Alex Rodriguez",
      email: "alex@example.com",
      department: "Management",
      profile_pic_url: "https://i.pravatar.cc/150?img=5",
    },
    receiver: {
      name: "Priya Patel",
      email: "priya@example.com",
      department: "Engineering",
      profile_pic_url: "https://i.pravatar.cc/150?img=6",
    },
  },
  {
    amount: 30,
    reason_decoded: "Thanks for going above and beyond to help our customer resolve their issue!",
    giver: {
      name: "Jamie Wilson",
      email: "jamie@example.com",
      department: "Customer Support",
      profile_pic_url: "https://i.pravatar.cc/150?img=7",
    },
    receiver: {
      name: "David Kim",
      email: "david@example.com",
      department: "Customer Success",
      profile_pic_url: "https://i.pravatar.cc/150?img=8",
    },
  },
  {
    amount: 75,
    reason_decoded: "Your code refactoring saved us so much time. The system is running 30% faster now!",
    giver: {
      name: "Lisa Wong",
      email: "lisa@example.com",
      department: "Engineering",
      profile_pic_url: "https://i.pravatar.cc/150?img=9",
    },
    receiver: {
      name: "Omar Hassan",
      email: "omar@example.com",
      department: "Engineering",
      profile_pic_url: "https://i.pravatar.cc/150?img=10",
    },
  },
  {
    amount: 40,
    reason_decoded: "Thank you for organizing the team building event. It was fun and really brought us together!",
    giver: {
      name: "Sophia Martinez",
      email: "sophia@example.com",
      department: "HR",
      profile_pic_url: "https://i.pravatar.cc/150?img=11",
    },
    receiver: {
      name: "Chris Taylor",
      email: "chris@example.com",
      department: "Office Management",
      profile_pic_url: "https://i.pravatar.cc/150?img=12",
    },
  },
];

interface Person {
  name: string;
  email: string;
  department: string;
  profile_pic_url: string;
}

interface Recognition {
  amount: number;
  reason_decoded: string;
  giver: Person;
  receiver: Person;
}

const Index = () => {
  const [recognitions, setRecognitions] = useState<Recognition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchRecognitions = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Set the mock data
        setRecognitions(mockRecognitions);
        setLoading(false);
      } catch (err) {
        setError("Failed to load recognitions");
        setLoading(false);
      }
    };

    fetchRecognitions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <header className="text-center mb-10 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Recognition Ticker
          </h1>
          <p className="text-muted-foreground mt-2">
            Celebrating teammates supporting each other
          </p>
        </header>

        <div className="bg-white shadow-lg rounded-xl p-6 h-[70vh]">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="h-full flex flex-col items-center justify-center text-destructive">
              <p className="text-lg font-medium">{error}</p>
              <button 
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : recognitions.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <p>No recognitions to display yet</p>
            </div>
          ) : (
            <RecognitionTicker recognitions={recognitions} speed={25} />
          )}
        </div>

        <footer className="mt-6 text-center text-sm text-muted-foreground">
          <p>Real-time team recognition dashboard</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
