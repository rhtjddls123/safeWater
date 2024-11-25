import { List } from "antd-mobile";
import { useNavigate } from "react-router-dom";

interface CurrentViolationListProps {
  data: CrawlingDataType[];
}

const CurrentViolationList = ({ data }: CurrentViolationListProps) => {
  const navigate = useNavigate();

  return (
    <div>
      {data.map((violation) => {
        return (
          <List key={violation + violation.number}>
            <List.Item
              onClick={() => {
                navigate("");
              }}
            >
              <div>{violation.companyName}</div>
              <p className="text-xs">처분일자: {violation.actionDate}</p>
              <p className="text-xs">처분명: {violation.actionName}</p>
            </List.Item>
          </List>
        );
      })}
    </div>
  );
};

export default CurrentViolationList;
