export class Project {
  public Config: any;
  public PublicationData = new PublicationData();
  public FrontMatter = new FrontMatter();
  public Body = new Body();
  public BackMatter = new BackMatter();
  public Stylesheets: Array<string> = [];
  public Scripts: Array<string> = [];
  public CropMarks = false;
  public CrossMarks = false;
  public PaperSize = PaperSize.A4;
  public Orientation = Orientation.Portrait;
  public LeftPage: PageDecoration = {
    Header: {
      RuleOff: RuleOff.none,
      Left: "none",
      Centre: "none",
      Right: "none",
    },
    Footer: {
      RuleOff: RuleOff.none,
      Left: "none",
      Centre: "none",
      Right: "none",
    }
  };
  public RightPage: PageDecoration = {
    Header: {
      RuleOff: RuleOff.none,
      Left: "none",
      Centre: "none",
      Right: "none",
    },
    Footer: {
      RuleOff: RuleOff.none,
      Left: "none",
      Centre: "none",
      Right: "none",
    }
  };
  public FirstPage: PageDecoration = {
    Header: {
      RuleOff: RuleOff.none,
      Left: "none",
      Centre: "none",
      Right: "none",
    },
    Footer: {
      RuleOff: RuleOff.none,
      Left: "none",
      Centre: "none",
      Right: "none",
    }
  };
  public Margins: Margins = {
    Bottom: "15mm",
    Inner: "25mm",
    Outer: "15mm",
    Top: "15mm"
  }
}


export enum Orientation {
  Landscape,
  Portrait
}

export enum PaperSize {
  A4,
  Letter
}

export class PageDecoration {
  public Header = new HeaderFooter();
  public Footer = new HeaderFooter();
}

export class PublicationData {
  public Isbn13?: string;
  public Title: string = "Book title";
  public Subtitle: string = "";
  public Authors: Array<PersonName> = [{ GivenNames: "Author name", Surname: "Surname" }];
}

export class PersonName {
  public Surname = "NOTSET";
  public GivenNames = "NOTSET";
}

export class BackMatter {
  public PageDecoration = new PageDecoration();
  public Index = Indexing.None;
}

export enum Indexing {
  None,
  OneColumn,
  TwoColumn,
  ThreeColumn
}

export class FrontMatter {
  public PageDecoration = new PageDecoration();
  public Contributions: Array<string> = [];
  public TableOfContents?: Number;
  public TableOfFigures?: boolean;
  public TableOfIllustrations?: boolean;
}

export class Body {
  public PageDecoration = new PageDecoration();
  public Chapters: Array<string> = [];
}

export class HeaderFooter {
  public RuleOff = RuleOff.full;
  public Left?: string;
  public Centre?: string;
  public Right?: string;
}

export class Margins {
  Top = "1cm";
  Bottom = "1.5cm";
  Inner = "2cm";
  Outer = "1cm";
}

export enum RuleOff {
  none,
  narrow,
  wide,
  full
}

