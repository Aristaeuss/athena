export class randiData {
  id: string;
  country: string;
  gbl_program: string;
  topic: string;
  project_name: string;
  partner_name: string;
  partner_location: string;
  collaboration_type: string;
  collaboration_subtype: string;
  investment: string;
  subject: string;
  sign_contract: string;
  start_date: string;
  end_date: string;
  capgemini_contact: string;
  partner_contact: string;
  comments: string;
  update_date: string;
  update_person: string;

  constructor(id: string, country: string, gbl_program: string, topic: string, project_name: string, partner_name: string, partner_location: string, collaboration_type: string,
    collaboration_subtype: string, investment: string, subject: string, sign_contract: string, start_date: string, end_date: string, capgemini_contact: string,
    partner_contact: string, comments: string, update_date: string, update_person: string) {
      this.id=id;
      this.country=country;
      this.gbl_program=gbl_program;
      this.topic= topic;
      this.project_name= project_name;
      this.partner_name= partner_name;
      this.partner_location= partner_location;
      this.collaboration_type= collaboration_type;
      this.collaboration_subtype= collaboration_subtype;
      this.investment= investment;
      this.subject= subject;
      this.sign_contract= sign_contract;
      this.start_date= start_date;
      this.end_date= end_date;
      this.capgemini_contact= capgemini_contact;
      this.partner_contact= partner_contact;
      this.comments= comments;
      this.update_date= update_date;
      this.update_person= update_person;
    }
}
