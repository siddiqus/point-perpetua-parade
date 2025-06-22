import axios from "axios";

interface User {
  display_name: string;
  email: string;
  country: string;
  custom_properties: {
    department: string;
    location: string;
    role: string;
    employment_status: string | null;
  };
  manager_email: string;
  profile_pic_url: string;
}

interface BonusResult {
  amount: number;
  giver: User;
  receiver: User;
  reason: string;
  reason_decoded: string;
  created_at: string;
}

const token = import.meta.env.VITE_BONUSLY_TOKEN;

// curl --request GET \
//      --url 'https://bonus.ly/api/v1/bonuses?limit=20&include_children=false&access_token=c834f2992c6544d75d0f00d583f05388' \
//      --header 'accept: application/json'

async function listBonuses({
  start_time,
  limit = 100,
  include_children = false,
  skip = 0,
}) {
  const response = await axios.get(
    `https://bonus.ly/api/v1/bonuses?limit=${limit}&start_time=${start_time}&include_children=${include_children}&skip=${skip}&access_token=${token}`,
    {
      headers: {
        // Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
}

export async function getBonuses() {
  const results: BonusResult[] = [];
  const date = new Date();
  date.setDate(date.getDate() - 3); // last day

  let skip = 0;
  while (true) {
    console.log(`fetching with skip ${skip}`);
    const responseData: {
      success: boolean;
      result: BonusResult[];
    } = await listBonuses({
      limit: 100,
      start_time: date.toISOString(),
      include_children: false,
      skip,
    });

    if (!responseData.success) {
      throw new Error("failed to fetch bonuses");
    }
    const data = responseData.result as BonusResult[];
    console.log(`fetched ${data.length} bonuses`);

    if (data.length > 0) {
      results.push(...data);
      skip += 100;
    } else {
      break;
    }
  }

  return results
    .filter((b) => b.receiver.country === "BD")
    .map((b) => {
      const { amount, giver, receiver, reason_decoded } = b;
      return {
        amount,
        reason_decoded,
        giver: {
          name: giver.display_name,
          email: giver.email,
          department: giver.custom_properties.department,
          profile_pic_url: giver.profile_pic_url,
        },
        receiver: {
          name: receiver.display_name,
          email: receiver.email,
          department: receiver.custom_properties.department,
          profile_pic_url: receiver.profile_pic_url,
        },
      };
    });
}
