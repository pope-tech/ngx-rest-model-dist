import { ModelFactory } from './model.factory';
import { Relationship } from './relationship';
import { Models } from './models';
export class BaseModel {
    constructor() {
        this.modelConfig = {
            key: '',
            uri: '',
            hidden: [],
            relationships: {}
        };
    }
    setConfig(config) {
        this.modelConfig = { ...this.getConfig(), ...config };
    }
    getConfig() {
        return this.modelConfig;
    }
    getUri() {
        return this.modelConfig.uri;
    }
    getSelfUri() {
        return this.modelConfig.uri + '/' + this[this.modelConfig.key];
    }
    setUri(uri) {
        this.modelConfig.uri = uri;
    }
    getKey() {
        return this.modelConfig.key;
    }
    getRelationship(key) {
        return this.modelConfig.relationships[key];
    }
    deserialize(input) {
        let config = this.getConfig();
        let relationships = [];
        for (let prop in input) {
            if (!input.hasOwnProperty(prop)) {
                continue;
            }
            if (config.hidden.indexOf(prop) > -1) {
                continue;
            }
            if (typeof input[prop] === 'object') {
                if (config.relationships.hasOwnProperty(this.snakeToCamel(prop))) {
                    relationships.push({
                        key: this.snakeToCamel(prop),
                        value: (input[prop] ? input[prop].data : null)
                    });
                }
                continue;
            }
            this[this.snakeToCamel(prop)] = input[prop];
        }
        for (let relationship of relationships) {
            if (relationship.value === null) {
                continue;
            }
            let relationshipConfig = config.relationships[relationship.key];
            let related = Models.get(relationshipConfig.model);
            let relationshipObject = new Relationship(this, related, relationshipConfig.type);
            this[relationship.key] = ModelFactory.makeRelatedFromRelationship(relationshipObject, relationship.value);
        }
        return this;
    }
    snakeToCamel(string) {
        return string.replace(/_\w/g, function (m) {
            return m[1].toUpperCase();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1yZXN0LW1vZGVsL3NyYy9saWIvbW9kZWxzL2Jhc2UtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk5QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRWxDLE1BQU0sT0FBTyxTQUFTO0lBVWxCO1FBUFEsZ0JBQVcsR0FBRztZQUNqQixHQUFHLEVBQUUsRUFBRTtZQUNQLEdBQUcsRUFBRSxFQUFFO1lBQ1AsTUFBTSxFQUFFLEVBQUU7WUFDVixhQUFhLEVBQUUsRUFBRTtTQUNyQixDQUFDO0lBRWEsQ0FBQztJQUVoQixTQUFTLENBQUMsTUFBTTtRQUNaLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztJQUNoQyxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBRztRQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUMvQixDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7SUFDaEMsQ0FBQztJQUVELGVBQWUsQ0FBQyxHQUFHO1FBQ2YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFFYixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUIsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLEtBQUksSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ25CLElBQUcsQ0FBRSxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM3QixTQUFTO2FBQ1o7WUFFRCxJQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNqQyxTQUFTO2FBQ1o7WUFFRCxJQUFHLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFFaEMsSUFBRyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7b0JBQzdELGFBQWEsQ0FBQyxJQUFJLENBQUM7d0JBQ2YsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO3dCQUM1QixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztxQkFDakQsQ0FBQyxDQUFDO2lCQUNOO2dCQUVELFNBQVM7YUFDWjtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9DO1FBRUQsS0FBSSxJQUFJLFlBQVksSUFBSSxhQUFhLEVBQUU7WUFFbkMsSUFBRyxZQUFZLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDNUIsU0FBUzthQUNaO1lBRUQsSUFBSSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVoRSxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRW5ELElBQUksa0JBQWtCLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVsRixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQywyQkFBMkIsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0c7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxDQUFDLE1BQU07UUFDZixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVMsQ0FBQztZQUNwQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsRmFjdG9yeSB9IGZyb20gJy4vbW9kZWwuZmFjdG9yeSc7XG5pbXBvcnQgeyBSZWxhdGlvbnNoaXAgfSBmcm9tICcuL3JlbGF0aW9uc2hpcCc7XG5pbXBvcnQgeyBTZXJpYWxpemFibGUgfSBmcm9tICcuL3NlcmlhbGl6YWJsZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuL21vZGVsLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IE1vZGVscyB9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGNsYXNzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIE1vZGVsLCBTZXJpYWxpemFibGUge1xuXG5cbiAgICAgcHVibGljIG1vZGVsQ29uZmlnID0ge1xuICAgICAgICAga2V5OiAnJyxcbiAgICAgICAgIHVyaTogJycsXG4gICAgICAgICBoaWRkZW46IFtdLFxuICAgICAgICAgcmVsYXRpb25zaGlwczoge31cbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgc2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgICB0aGlzLm1vZGVsQ29uZmlnID0gey4uLnRoaXMuZ2V0Q29uZmlnKCksIC4uLmNvbmZpZ307XG4gICAgfVxuXG4gICAgZ2V0Q29uZmlnKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbENvbmZpZztcbiAgICB9XG5cbiAgICBnZXRVcmkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsQ29uZmlnLnVyaTtcbiAgICB9XG5cbiAgICBnZXRTZWxmVXJpKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbENvbmZpZy51cmkgKyAnLycgKyB0aGlzW3RoaXMubW9kZWxDb25maWcua2V5XTtcbiAgICB9XG5cbiAgICBzZXRVcmkodXJpKSB7XG4gICAgICAgIHRoaXMubW9kZWxDb25maWcudXJpID0gdXJpO1xuICAgIH1cblxuICAgIGdldEtleSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxDb25maWcua2V5O1xuICAgIH1cblxuICAgIGdldFJlbGF0aW9uc2hpcChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxDb25maWcucmVsYXRpb25zaGlwc1trZXldO1xuICAgIH1cblxuICAgIGRlc2VyaWFsaXplKGlucHV0KSB7XG5cbiAgICAgICAgbGV0IGNvbmZpZyA9IHRoaXMuZ2V0Q29uZmlnKCk7XG4gICAgICAgIGxldCByZWxhdGlvbnNoaXBzID0gW107XG4gICAgICAgIGZvcihsZXQgcHJvcCBpbiBpbnB1dCkge1xuICAgICAgICAgICAgaWYoISBpbnB1dC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihjb25maWcuaGlkZGVuLmluZGV4T2YocHJvcCkgPiAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0eXBlb2YgaW5wdXRbcHJvcF0gPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICBpZihjb25maWcucmVsYXRpb25zaGlwcy5oYXNPd25Qcm9wZXJ0eSh0aGlzLnNuYWtlVG9DYW1lbChwcm9wKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpb25zaGlwcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogdGhpcy5zbmFrZVRvQ2FtZWwocHJvcCksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogKGlucHV0W3Byb3BdID8gaW5wdXRbcHJvcF0uZGF0YSA6IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzW3RoaXMuc25ha2VUb0NhbWVsKHByb3ApXSA9IGlucHV0W3Byb3BdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCByZWxhdGlvbnNoaXAgb2YgcmVsYXRpb25zaGlwcykge1xuXG4gICAgICAgICAgICBpZihyZWxhdGlvbnNoaXAudmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHJlbGF0aW9uc2hpcENvbmZpZyA9IGNvbmZpZy5yZWxhdGlvbnNoaXBzW3JlbGF0aW9uc2hpcC5rZXldO1xuXG4gICAgICAgICAgICBsZXQgcmVsYXRlZCA9IE1vZGVscy5nZXQocmVsYXRpb25zaGlwQ29uZmlnLm1vZGVsKTtcblxuICAgICAgICAgICAgbGV0IHJlbGF0aW9uc2hpcE9iamVjdCA9IG5ldyBSZWxhdGlvbnNoaXAodGhpcywgcmVsYXRlZCwgcmVsYXRpb25zaGlwQ29uZmlnLnR5cGUpO1xuXG4gICAgICAgICAgICB0aGlzW3JlbGF0aW9uc2hpcC5rZXldID0gTW9kZWxGYWN0b3J5Lm1ha2VSZWxhdGVkRnJvbVJlbGF0aW9uc2hpcChyZWxhdGlvbnNoaXBPYmplY3QsIHJlbGF0aW9uc2hpcC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzbmFrZVRvQ2FtZWwoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvX1xcdy9nLCBmdW5jdGlvbihtKSB7XG4gICAgICAgICAgICByZXR1cm4gbVsxXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=