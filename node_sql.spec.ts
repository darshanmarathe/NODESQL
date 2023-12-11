import { SELECT, FROM, WHERE, GROUPBY } from "./node_sql";

describe("Select tests", () => {
  it("should Select from Object", () => {
    const output = { fname: "Darshan", lname: "marathe", from: "web" };

    const data = {
      firstName: "Darshan",
      lastName: "marathe",
      age: 20,
      status: {
        loggedin: true,
        time: new Date(),
        from: "web",
        address: {
          city: "Pune",
          state: "Maharashtra",
          country: "India",
        },
      },
    };

    let res: any = SELECT(
      [
        "firstName fname",
        "lastName lname",
        "status.from from",
        "status.address.country country",
      ],
      FROM(data)
    );

    expect(res.fname).toBe("Darshan");
    expect(res.lname).toBe("marathe");

    expect(res).toEqual(output);
  });
});
