const BASE_URL = "http://103.129.115.165:5000";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFkbWluIiwiQWRtaW5BY2Nlc3MiOnRydWUsImFwcF9tZXRhZGF0YSI6IiIsImV4cCI6MTczNjE4NjQ1NCwiaXNzIjoiR2VuUE9TIn0.f1n7YRDDrnJQ_iy9zSLBp9wgBU2FnIdpPgome7a6Xcc";

export const getCompanyList = async () => {
  try {
    const url = `${BASE_URL}/api/Company/List`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postCompanyList = async (payload: any) => {
  try {
    const url = `${BASE_URL}/api/Company/List`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json-patch+json",
      },
      body: JSON.stringify({
        searchGroupId: payload.group,
        searchCompanyName: payload.companyName,
        searchVatNumber: payload.vatNumber,
        searchActiveId: payload.active,
        page: 1,
        pageSize: 25,
        availablePageSizes: ["15", "25", "50", "100"],
        draw: null,
        start: 0,
        length: 15,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
